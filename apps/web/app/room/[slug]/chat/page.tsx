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
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["room", params.slug],
    queryFn: () => getRoom(params.slug),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chat slug={params.slug} />
    </HydrationBoundary>
  );
};

export default ChatRoom;
