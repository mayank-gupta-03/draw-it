import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getRoom } from "../../../../apiClient/apiClient";
import Chat from "../../../../components/Chat";

interface Props {
  params: {
    slug: string;
  };
}
const ChatRoom = async ({ params }: Props) => {
  const { slug } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["room", slug],
    queryFn: () => getRoom(slug),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chat slug={slug} />
    </HydrationBoundary>
  );
};

export default ChatRoom;
