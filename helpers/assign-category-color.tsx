export function assignCategoryColor(category: string) {
    switch (category) {
        case "sport":
            return "bg-red-500";
        case "entertainment":
            return "bg-green-500";
        case "workshop":
            return "bg-blue-500";
        case "meetup":
            return "bg-pink-500";
        case "conference":
            return "bg-purple-500";
        case "travel":
            return "bg-yellow-500";
        case "hackathon":
            return "bg-indigo-500";
        case "food":
            return "bg-yellow-500";
        case "seminar":
            return "bg-blue-500";
        case "festival":
            return "bg-purple-500";
        case "social":
            return "bg-pink-500";
        case "gaming":
            return "bg-indigo-500";
        case "party":
            return "bg-fuchsia-500";
        case "other":
            return "bg-teal-500";
        default:
            return "bg-gray-500";
    }
}