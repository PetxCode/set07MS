import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAPI } from "../../API/authAPI";

const Register = () => {
  const navigate = useNavigate();
  const schema = yup.object({
    userName: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirm: yup.string().oneOf([yup.ref("password")]),
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

    registerAPI(data).then(() => {
      navigate("/sign-in");
    });
  });

  return (
    <div className="flex justify-center h-[100vh] items-center ">
      <div className="w-[400px] flex flex-col border rounded ">
        <div className="p-4 uppercase font-bold text-red-600">Register</div>

        <form className="px-2" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label className="text-[12px] font-bold">userName</label>
            <input
              placeholder="userName"
              className="border p-2"
              {...register("userName")}
            />
            {errors?.userName?.message && (
              <label className="text-[12px] flex justify-end text-red-600  mb-1 ">
                userName error
              </label>
            )}
          </div>
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
          <div className="flex flex-col">
            <label className="text-[12px] font-bold">confirm</label>
            <input
              placeholder="confirm"
              className="border p-2"
              {...register("confirm")}
            />
            {errors?.confirm?.message && (
              <label className="text-[12px] flex justify-end text-red-600  mb-1 ">
                confirm error
              </label>
            )}
          </div>

          <br />

          <button
            className="flex justify-center items-center w-full py-4 text-white bg-red-500 rounded transition-all duration-300 hover:cursor-pointer hover:scale-[1.01] "
            type="submit"
          >
            Register
          </button>

          <br />
          <hr />
          <br />

          <center className="text-[12px]">
            <div>Aleady have an Account?</div>
            <Link to="/sign-in">
              <div className="font-bold">sign in here</div>
            </Link>
          </center>
          <br />
        </form>
      </div>
    </div>
  );
};

export default Register;
