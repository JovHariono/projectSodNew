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
      .get(`http://localhost:3001/data3?_sort=id&_order=desc&_limit=10`)
      .then((res) => {
        setData(res.data);
        setIsPending(false)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
  }, [data])

  setInterval(() => {
    axios
      .get(`http://localhost:3001/data3?_sort=id&_order=desc&_limit=10`)
      .then((res) => {
        setData(res.data);
        setIsPending(false)
      })
      .catch((err) => console.log(err))
  }, 20000);

  return (
    <>
      <div className='scroll-list'>
        {/* <h2>Paragon List</h2>
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
        })} */}
          <div className="scroll">
            <div className="RightToLeft">
              <p>{data.length > 0 ? data[0].kata: ""}</p>
            </div>
            <div className="LeftToRight">
              <p>{data.length > 1 ? data[1].kata: ""}</p>
            </div>
            <div className="RightToLeft">
              <p>{data.length > 2 ? data[2].kata: ""}</p>
            </div>
            <div className="LeftToRight">
              <p>{data.length > 3 ? data[3].kata: ""}</p>
            </div>
            <div className="RightToLeft">
              <p>{data.length > 4 ? data[4].kata: ""}</p>
            </div>
            <div className="LeftToRight">
              <p>{data.length > 5 ? data[5].kata: ""}</p>
            </div>
            <div className="RightToLeft">
              <p>{data.length > 6 ? data[6].kata: ""}</p>
            </div>
            <div className="LeftToRight">
              <p>{data.length > 7 ? data[7].kata: ""}</p>
            </div>
            <div className="RightToLeft">
              <p>{data.length > 8 ? data[8].kata: ""}</p>
            </div>
            <div className="LeftToRight">
              <p>{data.length > 9 ? data[9].kata: ""}</p>
            </div>
          </div>
      </div>
    </>
  );
};

export default ParagonList;