# Zod Validation Setup

This directory contains Zod validation schemas and utilities for the Budget Flow application.

## Files

- `validations.ts` - Contains all Zod schemas for data validation
- `utils.ts` - Utility functions for handling validation and common operations
- `examples/form-validation.tsx` - Example React component showing form validation

## Usage

### 1. Import Schemas

```typescript
import { signUpSchema, budgetSchema, transactionSchema } from "@/lib/validations";
import { validateWithZod, formatZodError } from "@/lib/utils";
```

### 2. Validate Data

```typescript
// Validate form data
const validation = validateWithZod(signUpSchema, formData);

if (!validation.success) {
  // Handle validation errors
  setErrors(validation.errors);
  return;
}

// Data is now typed and safe to use
const { email, password, name } = validation.data;
```

### 3. API Route Validation

```typescript
// In your API route
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const validation = validateWithZod(signUpSchema, body);
  
  if (!validation.success) {
    return NextResponse.json(
      { error: "Validation failed", details: validation.errors },
      { status: 400 }
    );
  }
  
  // Process validated data
  const { email, password, name } = validation.data;
}
```

### 4. Form Validation in React

See `examples/form-validation.tsx` for a complete example of form validation with error handling.

## Available Schemas

### Authentication
- `signInSchema` - Email and password validation
- `signUpSchema` - Registration with password confirmation

### Financial Data
- `budgetSchema` - Budget creation and updates
- `transactionSchema` - Income/expense transactions
- `expenseSchema` - Expense-specific validation
- `incomeSchema` - Income-specific validation

### User Data
- `userSchema` - User profile data
- `profileFormSchema` - Profile form validation
- `settingsFormSchema` - User settings validation

### API Requests
- `paginationSchema` - Pagination parameters
- `dateRangeSchema` - Date range validation

## Utility Functions

- `validateWithZod()` - Safe validation with error formatting
- `formatZodError()` - Format Zod errors for display
- `getFirstZodError()` - Get the first error message
- `formatCurrency()` - Format numbers as currency
- `formatDate()` - Format dates consistently
- `debounce()` - Debounce function calls
- `generateId()` - Generate random IDs
- `isEmpty()` - Check if value is empty
- `deepClone()` - Deep clone objects

## TypeScript Types

All schemas export their inferred types:

```typescript
import type { SignUp, Budget, Transaction } from "@/lib/validations";
```

## Best Practices

1. **Always validate on both client and server** - Client validation for UX, server validation for security
2. **Use the `validateWithZod` utility** - It provides consistent error formatting
3. **Handle validation errors gracefully** - Show user-friendly error messages
4. **Type your data** - Use the exported types for better TypeScript support
5. **Keep schemas DRY** - Reuse and extend schemas when possible

## Example: Creating a New Schema

```typescript
// In validations.ts
export const newFeatureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().max(500, "Description too long"),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.date().optional(),
});

export type NewFeature = z.infer<typeof newFeatureSchema>;
```

## Testing Validation

```typescript
// Test valid data
const validData = {
  title: "New Feature",
  description: "A great new feature",
  priority: "high" as const,
};

const result = newFeatureSchema.safeParse(validData);
console.log(result.success); // true

// Test invalid data
const invalidData = {
  title: "",
  description: "A".repeat(600),
  priority: "invalid" as any,
};

const result2 = newFeatureSchema.safeParse(invalidData);
console.log(result2.success); // false
console.log(result2.error.issues); // Array of validation errors
``` 