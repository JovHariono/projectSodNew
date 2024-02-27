import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Paragon } from '../type';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IParagonListProps {
}

const ParagonList: React.FunctionComponent<IParagonListProps> = (props) => {
  const [data, setData] = useState<Paragon[]>([])
  const [pending, setIsPending] = useState(true)

  const router = useRouter()

  useEffect(() => {
    axios
      .get(`http://localhost:3001/data1`)
      .then((res) => {
        setData(res.data);
        setIsPending(false)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <div>
        <h2>Paragon List</h2>
        {pending && <div>Loading...</div>}
        {data.map((data) => {
          return (
            <div key={String(data.id)} onClick={() => {
              router.push({
                pathname: "/paragondetail",
                query: { id: String(data.id) }
              })
            }}>{data.kata}</div>
          )
        })}
          <div className="scroll">
            <div className="RightToLeft">
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
            <div className="LeftToRight">
              <p>Sed do eiusmod tempor incididunt</p>
            </div>
          </div>
      </div>
    </>
  );
};

export default ParagonList;