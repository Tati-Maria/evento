"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
    event: any;
}

const EditEvent: React.FC<Props> = ({event}) => {
  const router = useRouter();

  const handleEdit = (event: any) => {
    router.push(`/update-event?id=${event.id}`);
  };

  return (
  <Button 
  variant="ghost"
  onClick={() => handleEdit(event)}
  >
    Edit
</Button>
);
};

export default EditEvent;
