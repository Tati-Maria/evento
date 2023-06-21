"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { CiEdit } from "react-icons/ci";

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
    <CiEdit className="text-green-500 hover:text-green-600" size={25} />
</Button>
);
};

export default EditEvent;
