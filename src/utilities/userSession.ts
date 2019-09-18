export function authenticated(): boolean {
  return !!currentUser();
}

export function currentUser(): { avatar: string } | null {
  const user: string | null = localStorage.getItem("user");
  return user ? JSON.parse(user) : user;
}