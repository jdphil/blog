import { NextResponse } from 'next/server'

async function addSubscriberToMailchimp(email: string) {
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
  const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER

  console.log('Mailchimp Config:', {
    server: MAILCHIMP_API_SERVER,
    audienceId: MAILCHIMP_AUDIENCE_ID,
    hasApiKey: !!MAILCHIMP_API_KEY
  })

  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_API_SERVER) {
    throw new Error('Missing Mailchimp configuration')
  }

  const data = {
    email_address: email,
    status: 'pending', // Double opt-in
  }

  const url = `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`
  console.log('Mailchimp API URL:', url)

  try {
    const response = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const responseData = await response.json()
    console.log('Mailchimp API Response:', {
      status: response.status,
      data: responseData
    })

    if (!response.ok) {
      // Handle existing subscribers gracefully
      if (responseData.title === 'Member Exists') {
        return { ok: true, message: 'You\'re already subscribed! Please check your email for confirmation.' }
      }
      throw new Error(responseData.detail || 'Error subscribing to newsletter')
    }

    return { ok: true, message: 'Please check your email to confirm your subscription.' }
  } catch (error) {
    console.error('Mailchimp API Error:', error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    console.log('Received subscription request for:', email)

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    const result = await addSubscriberToMailchimp(email)

    if (!result.ok) {
      throw new Error(result.message)
    }

    return NextResponse.json(
      { message: result.message },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong' },
      { status: 500 }
    )
  }
} 