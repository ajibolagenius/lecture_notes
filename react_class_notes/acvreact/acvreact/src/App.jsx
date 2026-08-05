import Button from "./components/Button";
import Card from "./components/Card";

function App() {
    const userName = "Gold";
    const courseTitle = "React";


    return (
        <>
            <p>Welcome to {courseTitle}, {userName}!</p>

            <Button text="Success ✅" color="green" />
            <Button text="Disabled 😑" color="grey" />
            <Button text="Info ℹ️" color="blue" />
            <Button text="Danger ‼️" color="red" />

            <hr />

            <Card title="Card Title">
              <p>This is the card content.</p>

            </Card>

        </>
    )
}

export default App;
