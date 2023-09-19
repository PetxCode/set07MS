import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInAPI } from "../../API/authAPI";
import { useRecoilState } from "recoil";
import { userIn } from "../../global/recoil";

const SignIn = () => {
  const [state, setState] = useRecoilState(userIn);
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    signInAPI(data).then((res) => {
      setState(res);
      navigate("/");
    });
  });

  console.log(state);

  return (
    <div className="flex justify-center h-[100vh] items-center ">
      <div className="w-[400px] flex flex-col border rounded ">
        <div className="p-4 uppercase font-bold text-red-600">SignIn</div>

        <form className="px-2" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label className="text-[12px] font-bold">email</label>
            <input
              placeholder="email"
              className="border p-2"
              {...register("email")}
            />
            {errors?.email?.message && (
              <label className="text-[12px] flex justify-end text-red-600  mb-1 ">
                email error
              </label>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-[12px] font-bold">password</label>
            <input
              placeholder="password"
              className="border p-2"
              {...register("password")}
            />
            {errors?.password?.message && (
              <label className="text-[12px] flex justify-end text-red-600  mb-1 ">
                password error
              </label>
            )}
          </div>

          <br />

          <button
            className="flex justify-center items-center w-full py-4 text-white bg-red-500 rounded transition-all duration-300 hover:cursor-pointer hover:scale-[1.01] "
            type="submit"
          >
            Sign In
          </button>

          <br />
          <hr />
          <br />

          <center className="text-[12px]">
            <div>Don't have an Account?</div>
            <Link to="/register">
              <div className="font-bold">Register here</div>
            </Link>
          </center>
          <br />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
