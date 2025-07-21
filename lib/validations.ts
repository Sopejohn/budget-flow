import { z } from "zod";

// User validation schemas
export const userSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().url().optional().or(z.literal("")),
});

export const createUserSchema = userSchema.omit({ id: true });
export const updateUserSchema = userSchema.partial();

// Authentication schemas
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Budget and financial schemas
export const budgetSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Budget name is required"),
  amount: z.number().positive("Amount must be positive"),
  category: z.string().min(1, "Category is required"),
  period: z.enum(["monthly", "weekly", "yearly"]),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export const transactionSchema = z.object({
  id: z.string().optional(),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  type: z.enum(["income", "expense"]),
  date: z.date(),
  budgetId: z.string().optional(),
});

export const expenseSchema = z.object({
  id: z.string().optional(),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  date: z.date(),
  budgetId: z.string().optional(),
});

export const incomeSchema = z.object({
  id: z.string().optional(),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().min(1, "Description is required"),
  source: z.string().min(1, "Income source is required"),
  date: z.date(),
  frequency: z.enum(["one-time", "monthly", "weekly", "yearly"]).optional(),
});

// Form validation schemas
export const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

export const settingsFormSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
  timezone: z.string().min(1, "Timezone is required"),
  notifications: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
});

// API request schemas
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const dateRangeSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
}).refine((data) => data.startDate <= data.endDate, {
  message: "Start date must be before or equal to end date",
  path: ["endDate"],
});

// Utility types
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
export type Budget = z.infer<typeof budgetSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type Expense = z.infer<typeof expenseSchema>;
export type Income = z.infer<typeof incomeSchema>;
export type ProfileForm = z.infer<typeof profileFormSchema>;
export type SettingsForm = z.infer<typeof settingsFormSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type DateRange = z.infer<typeof dateRangeSchema>; 