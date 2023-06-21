import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const RecentAttendece = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="w-9 h-9">
          <AvatarImage src="/60.jpg" alt="avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h4 className="text-sm font-medium leading-none">Johna Doe</h4>
          <p className="text-xs text-gray-500">2 days ago</p>
        </div>
        <div className="ml-auto font-medium">Festival of Colors</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/63.jpg" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-xs text-gray-500">6 days ago</p>
        </div>
        <div className="ml-auto font-medium">Sanity Seminar</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/MayaJacobs.jpg" alt="Avatar" />
          <AvatarFallback>MJ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Maya</p>
          <p className="text-xs text-gray-500">12 days ago</p>
        </div>
        <div className="ml-auto font-medium">Sanity Seminar</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/MayaJacobs.jpg" alt="Avatar" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Amora Tati</p>
          <p className="text-xs text-gray-500">1 month ago</p>
        </div>
        <div className="ml-auto font-medium">Influencer Meetup</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/MayaJacobs.jpg" alt="Avatar" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">July Jhane</p>
          <p className="text-xs text-gray-500">1 month ago</p>
        </div>
        <div className="ml-auto font-medium">Influencer Meetup</div>
      </div>
    </div>
  );
};

export default RecentAttendece;
