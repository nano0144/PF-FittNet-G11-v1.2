import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart, getGymDetail } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavBar3 } from "./NavBar3";
import CartItem from "../CartItem/CartItem";

import style from "./styles/style.module.css";
import user from "../../asets/icons/users.svg";
import actividades from "../../asets/icons/trending-up.svg";
import start from "../../asets/icons/star.svg";
import map from "../../asets/icons/map-pin.svg";
import { CardIcons } from "../../helpers/Cards/Cards";

export default function GymDetail() {
  let { userId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGymDetail(userId)); // eslint-disable-next-line
  }, [userId]);

  const gymDetail = useSelector((state) => state.gymDetail);

  let usuarioId = localStorage.getItem("userId");
  // id de usuario que está en la app
  // console.log(gymDetail, 'id de usuario que está en la app')

  if (!gymDetail.name) {
    return (
      <img
        id="loading"
        src="https://www.sanfranciscohm.com/static/img/loading.gif"
        alt="loading..."
      />
    );
  } else {
    return (
      <div>
        {/* Bloque de titulo */}
        <section className={style.curved}>
          <p className={style.title}>{gymDetail.name}</p>
        </section>
        {/* Bloque de cards presentacion */}
        <div className={style.contDat}>
          <CardIcons img={start} num={gymDetail.raiting} />
          <CardIcons img={user} num="55" />
          <CardIcons img={map} num="1.4 Km" />
          <CardIcons img={actividades} num={gymDetail.services.length} />
        </div>
        
        {/* Bloque de info del carrito */}
        <div>
          <NavBar3 id={[gymDetail]} usuarioId={usuarioId} />
        </div>

        {/* Detalle servicio */}
        <div className={style.contServices}>
          {gymDetail.services.map((e) => {
            return (
              <div key={e._id}>
                <CartItem
                  id={e._id}
                  key={e._id}
                  name={e.name}
                  price={e.price}
                  description={e.description}
                  duration={e.duration}
                />{" "}
                <br></br>
              </div>
            );
          })}
        </div>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }
}

//http://localhost:3000/detail/gym/6292dae93fc1e9d735aea34c
//
