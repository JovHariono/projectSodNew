import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import {useState} from 'react'

interface IFormParagonProps {}

const FormParagon: React.FunctionComponent<IFormParagonProps> = (props) => {
    const [kata, setKata] = useState("")
    const [isPending, setIsPending] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            // Fetch the last used ID from the server
            // const response = await axios.get("http://localhost:3001/data?_sort=id&_order=desc&_limit=1");
            // const lastItem = response.data[0];
            // const lastUsedId = lastItem ? lastItem.id : 0;

            // const newId = lastUsedId + 1;

            const postData = {
                // id: newId,
                kata,
            };

            const postResponse = await axios.post("http://localhost:3001/data2", postData, {
                headers: { "Content-Type": "application/json" },
            });

            if (postResponse.status === 201) {
                router.push("/paragonlist");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsPending(true);
        }
    }

  return (
    <>
      <div>
        <h2>Form Paragon</h2>
        <form className="formParagon" onSubmit={handleSubmit}>
          <label>Input kata-kata</label>
          <input type="text" required value={kata} onChange={(e) => setKata(e.target.value)}/>

          { isPending ? (<button>Submitting...</button>) : (<button>Submit</button>) }
        </form>
      </div>
    </>
  );
};

export default FormParagon;
