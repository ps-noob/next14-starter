import { handleGithubLogin } from "@/lib/action";
import { auth } from "@/lib/auth";

const LoginPage = () => {
  // const session = await auth();
  // console.log(session)
  
  return <div>
    
    <form action={handleGithubLogin}>
      <button>Login with giithub</button>
    </form>
  </div>;
};

export default LoginPage;
