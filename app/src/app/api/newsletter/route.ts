import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.MAILCHIMP_API_KEY!
const API_SERVER = process.env.MAILCHIMP_API_SERVER!
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!

export async function POST(req: NextRequest) {
  try {
    const { email, firstName } = await req.json()

    const rawEmail = (email as string).trim().toLowerCase()

    if (!rawEmail || !rawEmail.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 })
    }

    const res = await fetch(
      `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${API_KEY}`,
        },
        body: JSON.stringify({
          email_address: rawEmail,
          status: 'subscribed', // use "pending" if you enable double opt-in
          merge_fields: {
            FNAME: firstName ?? '',
          },
        }),
      },
    )

    const data = await res.json()

    // Success: new member created
    if (res.status === 200 || res.status === 201) {
      return NextResponse.json({ success: true })
    }

    // Treat "Member Exists" as a soft success
    if (data?.title === 'Member Exists') {
      return NextResponse.json({ success: true, alreadySubscribed: true })
    }

    // Any other Mailchimp error
    return NextResponse.json(
      { success: false, error: data?.detail ?? 'Mailchimp error' },
      { status: res.status },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Unexpected server error' }, { status: 500 })
  }
}
