import { AiFillGithub } from "react-icons/ai";
import { GiFireRay } from "react-icons/gi";
type HomeScreenProps = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
};
export const HomeScreen = ({ setPage }: HomeScreenProps) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "",
      }}
    >
      <h1>Sudoku</h1>
      <h5 style={{ marginBottom: "40px" }}>
        Pháo bông <GiFireRay color="red" />{" "}
      </h5>
      <button
        style={{ marginBottom: "50px" }}
        className="home__btn"
        type="button"
      >
        <a
          onClick={() => {
            setPage("singlePlayer");
          }}
        >
          Single Player
        </a>
      </button>
      <span>
        <AiFillGithub />{" "}
        <a href="https://github.com/khuongduy354/sudoku-fe.git">khuongduy</a>
      </span>
    </div>
  );
};
