import { Button } from '@/components/ui/button';
import { Post } from '@/types/Post';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Eye, ThumbsDown, ThumbsUp } from 'lucide-react';
import ky from 'ky';
import { Skeleton } from '@/components/ui/skeleton';

export const Route = createFileRoute('/posts/$id')({
  component: function PostId() {
    const params = Route.useParams();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
      queryKey: ['posts', params.id],
      retry: false,
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return ky.get(`https://dummyjson.com/posts/${params.id}`).json<Post>();
      },
    });

    if (isLoading)
      return (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-4 w-[600px]" />
          <Skeleton className="h-4 w-[600px]" />
          <Skeleton className="h-4 w-[600px]" />

          <div className="my-3">
            <Skeleton className="h-8 w-[100px]" />
          </div>

          <div className="flex gap-3">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-8 w-[100px]" />
          </div>
        </div>
      );

    if (isError) return navigate({ to: '/' });

    if (!data) return <p>No data</p>;

    return (
      <>
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p>{data.body}</p>

        <Button variant="outline" onClick={() => window.history.back()}>
          Go back
        </Button>

        <div className="flex gap-4 mt-4">
          <p className="flex gap-2 items-center cursor-pointer">
            <ThumbsUp size={20} />
            {data.reactions.likes}
          </p>
          <p className="flex gap-2 items-center cursor-pointer">
            <ThumbsDown size={20} />
            {data.reactions.dislikes}
          </p>

          <p className="flex gap-2 items-center">
            <Eye size={20} /> {data.views}
          </p>
        </div>
      </>
    );
  },
});
