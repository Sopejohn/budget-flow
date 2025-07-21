import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/lib/validations";
import { validateWithZod } from "@/lib/utils";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the data using Zod
    const validation = validateWithZod(signUpSchema, body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: validation.errors 
        },
        { status: 400 }
      );
    }
    
    // If validation passes, the data is typed and safe to use
    const { email, password, name } = validation.data;
    
    // Your business logic here...
    console.log("Validated data:", { email, name }); // password omitted for security
    
    return NextResponse.json(
      { 
        message: "User created successfully",
        user: { email, name }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Example of using Zod with query parameters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Validate query parameters
    const queryData = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
      search: searchParams.get("search") || undefined,
    };
    
    // You could create a specific schema for query validation
    const querySchema = z.object({
      email: z.string().email().optional(),
      page: z.number().int().positive().default(1),
      limit: z.number().int().positive().max(100).default(10),
    });
    
    const validation = validateWithZod(querySchema, queryData);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: validation.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ 
      message: "Query validated successfully",
      data: validation.data 
    });
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 