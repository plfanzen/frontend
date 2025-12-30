export async function getRole(): Promise<"Player" | "Author" | "Admin" | null> {
  try {
    const { getToken } = useApollo();
    let jwt = await getToken();
    if (!jwt) {
      return null;
    }
    const payload = JSON.parse(atob(jwt.split(".")[1]));
    return payload.role;
  } catch (error) {
    return null;
  }
}
