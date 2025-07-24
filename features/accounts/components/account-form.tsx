import { z } from "zod";
import { Trash } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAccountSchema } from "@/db/schema";
import { useNewAccount } from "../hooks/use-new-account";

const formSchema = insertAccountSchema.pick({ name: true });

type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}

export const AccountForm = ({ id, defaultValues, onSubmit, disabled }: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });
    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    };
    const onDelete = () => {
        onDelete?.();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                <FormField
                    name="name" 
                    control={form.control}
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input 
                                disabled={disabled}
                                placeholder="Account Name"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button className="w-full" disabled={disabled}>
                {id ? "Save Changes" : "Create Account"}
            </Button>
            {!!id && (<Button
                type="button"
                disabled={disabled}
                onClick={onDelete}
                className="w-full"
                size="icon"
                variant="outline"
            >
                <Trash className="size-4 mr-2"/>
                Delete Account
            </Button>)}

            </form>
        </Form>
    )
}
