import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createFileRoute } from '@tanstack/react-router';
import { FormEvent, useState } from 'react';
import { z } from 'zod';

interface ContactFormError {
  path: string;
  message: string;
}

const schema = z.object({
  fullName: z.string().min(3).max(50),
  phone: z.string().min(8),
  email: z.string().email(),
  comment: z.string().max(500),
});

export const Route = createFileRoute('/contact')({
  component: function Contact() {
    const [error, setError] = useState<ContactFormError | null>(null);
    const [success, setSuccess] = useState(false);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());

      try {
        const parsedData = schema.parse(data);

        console.group('Parsed data');
        console.table(parsedData);
        console.groupEnd();

        setSuccess(true);
        event.currentTarget.reset();
      } catch (error: any) {
        const err = error.errors[0];

        setError({
          path: err.path[0],
          message: err.message,
        });
      }
    };

    return (
      <>
        <form className="flex flex-col gap-4" onSubmit={submit}>
          <div className="my-3">
            <Label htmlFor="fullName">Fuldenavn</Label>
            <Input name="fullName" type="text" />

            {error && error.path === 'fullName' && <p className="text-red-500">{error.message}</p>}
          </div>

          <div className="my-3">
            <Label htmlFor="phone">Telefonnummer</Label>
            <Input name="phone" type="tel" />

            {error && error.path === 'phone' && <p className="text-red-500">{error.message}</p>}
          </div>

          <div className="my-3">
            <Label htmlFor="email">Email</Label>
            <Input name="email" type="email" />

            {error && error.path === 'email' && <p className="text-red-500">{error.message}</p>}
          </div>

          <div className="my-3">
            <Label htmlFor="comment">Kommentar</Label>
            <Textarea name="comment" />

            {error && error.path === 'comment' && <p className="text-red-500">{error.message}</p>}
          </div>

          <Button type="submit">Submit</Button>

          {success && <p className="text-green-500">Success formen er sendt!</p>}
        </form>
      </>
    );
  },
});
