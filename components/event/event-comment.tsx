import TextView from "../ui/textview";
import { auth } from "@clerk/nextjs";
import DeleteComment from "../action-components/delete-comment";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

type EventCommentProps = {
  text: string;
  userId?: string;
  commentId: string;
  userName?: string;
  userImage?: string | null;
  createdAt?: string;
};

const EventComment = ({
  text,
  userId,
  commentId,
  userName,
  userImage,
  createdAt,
}: EventCommentProps) => {
  const { userId: authUserId } = auth();

  return (
    <div
    className="flex flex-col space-y-4 p-4 border-b border-neutral-200 bg-[#f7f7f7]"
    >
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage
            src={userImage || "/image/placeholder"}
            alt="user image"
          />
          <AvatarFallback>{userName?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div
        className="flex flex-col space-y-1"
        >
          <h3>{userName}</h3>
          <small className="text-sm text-neutral-500">{createdAt}</small>
        </div>
      </div>
      <TextView text={text} className="text-gray-800" />
      {userId === authUserId && (
        <div className="flex justify-end">
          <DeleteComment commentId={commentId} />
        </div>
      )}
    </div>
  );
};

export default EventComment;
