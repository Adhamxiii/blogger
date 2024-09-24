import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await connectDB();
};

LoadDB();

export async function POST(req) {
  const formData = await req.formData();

  const emailDate = {
    email: `${formData.get("email")}`,
  };
  await EmailModel.create(emailDate);

  return NextResponse.json({ success: true, msg: "Email Sent" });
}

export async function GET(req) {
  const emails = await EmailModel.find({});
  return NextResponse.json({ success: true, data: emails });
}

export async function DELETE(req) {
  try {
    const emailId = req.nextUrl.searchParams.get("id");
    if (!emailId) {
      return NextResponse.json({
        success: false,
        msg: "Email ID is required",
      });
    }

    const email = await EmailModel.findByIdAndDelete(emailId);
    if (!email) {
      return NextResponse.json({ success: false, msg: "Email not found" });
    }

    return NextResponse.json({ success: true, msg: "Email deleted" });
  } catch (error) {
    console.error("Error deleting email:", error);
    return NextResponse.json({ success: false, msg: "Error deleting email" });
  }
}
