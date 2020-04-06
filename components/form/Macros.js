import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { CREATE_PROFILE } from "../../gql/mutations";

import FormRadio from "./FormRadio";

export default function Macros({ user, setUser }) {
  const router = useRouter();

  const variables = {
    age: parseInt(user.age),
    height: parseInt(user.height),
    gender:
      user.gender === "true" ? true : user.gender === "false" ? false : null,
    weight: user.weight,
    goal_weight: user.goalWeight,
    activity_level: user.activityLevel,
    fat: user.fat || 0,
    carbs: user.carbs || 0,
    protein: user.protein || 0,
  };

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: parseInt(e.target.value) });
  }

  const [createProfile, {}] = useMutation(CREATE_PROFILE);

  const handleSubmit = async () => {
    const { loading, data, error } = await createProfile({
      variables: variables,
    });

    if (error) {
    }

    if (data) {
      router.push("/[user]/dashboard", `/user/dashboard`);
    }
  };

  return (
    <>
      <h2 className="flex flex-col text-5xl self-center mb-8">
        Tracking Macros
      </h2>
      <h3 className="font-extrabold text-md self-start px-2 my-4">
        Enter your goal amount for each macro:
      </h3>
      <form className="flex flex-col w-full px-12 mb-12">
        <div className="flex my-8">
          <div className="w-1/2">Carbs</div>
          <input
            onChange={handleChange}
            name="carbs"
            className="w-1/2 flex-shrink border-b"
            placeholder="Daily Goal"
          />
        </div>
        <div className="flex my-8">
          <div className="w-1/2">Fat</div>
          <input
            onChange={handleChange}
            name="fat"
            className="w-1/2 flex-shrink border-b"
            placeholder="Daily Goal"
          />
        </div>
        <div className="flex my-8">
          <div className="w-1/2">Protein</div>
          <input
            onChange={handleChange}
            name="protein"
            className="w-1/2 flex-shrink border-b"
            placeholder="Daily Goal"
          />
        </div>
        <div className="flex my-8">
          <div className="w-1/2">Calories</div>
          <input
            onChange={handleChange}
            name="calories"
            className="w-1/2 flex-shrink border-b"
            placeholder="Daily Goal"
          />
        </div>
      </form>
      <button
        className="w-full py-2 text-white text-2xl bg-pink-400 rounded hover:bg-pink-500 self-center"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </>
  );
}
