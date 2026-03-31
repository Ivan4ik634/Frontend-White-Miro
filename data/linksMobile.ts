import { PAGES } from "@/config/pages";
import { FolderOpen, Home, ListTodo, Settings } from "lucide-react";

export const linksMobile = [
    { name: 'Home', icon: Home, url: PAGES.dashboard },
      { name: 'Tasks', icon: ListTodo, url: PAGES.tasks },
       { name: 'Boards', icon: FolderOpen, url: PAGES.boards },
       { name: 'Settings', icon: Settings, url: PAGES.settings },
]