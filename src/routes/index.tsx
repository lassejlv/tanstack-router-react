import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Post } from '@/types/Post';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import ky from 'ky';

export const Route = createFileRoute('/')({
  component: function Home() {
    const { data, isLoading } = useQuery({
      queryKey: ['posts'],
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return await ky.get('https://dummyjson.com/posts').json<{ posts: Post[] }>();
      },
    });

    return (
      <>
        <h1 className="text-3xl font-bold">Home</h1>
        <p>This is the homepage</p>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div className="flex flex-col space-y-3" key={i}>
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        )}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button>
                    <Link to="/posts/$id" params={{ id: String(post.id) }}>
                      Read more
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </>
    );
  },
});
