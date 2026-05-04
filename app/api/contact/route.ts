import { ContactFormData } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const data: ContactFormData = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required fields",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Log the contact form submission (in a real app, you'd send an email or save to DB)
    console.log("New Contact Form Submission:", {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      message: data.message,
    });

    // Simulate sending email (in production, use Nodemailer, SendGrid, etc.)
    // For now, we just log it and return success
    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for your message! We'll be in touch soon.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred. Please try again.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
