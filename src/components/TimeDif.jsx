// components/UserCard.jsx
import { useTimeAgo } from "../utils/useTimeAgo";
import { useAuthStore } from '../store/authStore.jsx';


export default function TimeDif() {
        const { user } = useAuthStore();

  const diff = useTimeAgo(user.lastLogin);

  // Example: check if user inactive > 7 days
  const isInactive = diff.days > 7;
  if(diff.minutes > 50){
    console.log('Expired')
  }
  else{
    console.log('Not Expired')
  }

  return (
    <div className="p-4 border rounded-xl shadow bg-white max-w-sm">
      <h2 className="text-lg font-semibold">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-500 mt-2">
        Last login: {diff.minutes} hours ago
      </p>
      {isInactive && (
        <p className="text-red-500 text-sm font-medium mt-2">
          ⚠ User inactive for more than 7 days!
        </p>
      )}
    </div>
  );
}
