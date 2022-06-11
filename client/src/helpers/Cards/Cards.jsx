import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { SweetAlrtTem } from "../../asets/helpers/sweetalert";
import { postAvatar } from "../../redux/actions/index";

import axios from "axios";

import styles from "./styles/stylesCards.module.css";

export const CardAvatares = (props) => {
  const { image } = props;

  const estiloPruebaImage = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className={styles.containerCardAvatares}>
      <div style={estiloPruebaImage}></div>
      <span style={{}}></span>
    </div>
  );
};

export const CardAvatarAdicional = (props) => {
  // El id del avatar llega por props
  const { name, image, features, id, userId, typeuser, nameUser, icono } =
    props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleUdpateAvatar(idAvatar, e) {
    e.preventDefault();
    const avatar = { avatar: idAvatar };

    // dispatch(postAvatar(userId, avatar));
    SweetAlrtTem(
      `elegiste el avatar ${name}, ahora vas a ser redirigido a los gimnasios que cumplan con las caracteristicas de este avatar`,
      "success"
    );
    console.log("se agrego el avatar al usuario");
    navigate(`/home/${typeuser}/${nameUser}/${userId}/${idAvatar}`);

    let avatarSelect = await postAvatar(userId, avatar);

    // Hay que avaluar la respuesta y retornar un swit altert
    // console.log(avatarSelect, 'Respuesta a avatarSelect')

    if (avatarSelect.data.ok === false) {
      // Si el userId es invalido
      return window.alert(avatarSelect.data.msg);
    }

    let avatarId = avatarSelect
      ? avatarSelect.data.UserUpdateAvatar.avatar
      : null;

    console.log(avatarSelect, "avatar selected id");

    localStorage.setItem("avatar", avatarId);

    navigate(`/home/${typeuser}/${nameUser}/${userId}/${avatarId}`);
  }

  async function postAvatar(userId, avatar) {
    try {
      const dataUdpateAvatar = await axios.put(
        `/api/user/avatar/${userId}`,
        avatar
      );

      console.log(dataUdpateAvatar);

      return dataUdpateAvatar;
    } catch (error) {
      console.log(error);
    }
  }

  const estiloIcono = {
    content: "",
    width: "120px",
    height: "120px",
    backgroundImage: `url(${icono})`,
  };

  return (
    <div className={styles.containerCardAvatar}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div
            style={{ backgroundImage: `url(${image})` }}
            className={styles.cardFront}
          >
            <div className={styles.cardTitle} style={estiloIcono}></div>
          </div>

          <div className={styles.cardBack}>
            <h5 style={{ fontWeight: "700" }}>{name}</h5>
            <ul>
              {features?.map((x, y) => (
                <li className={styles.listFeaturesAvatar} key={y}>
                  {x}
                </li>
              ))}
            </ul>
            <button
              className={styles.btnSelectAvatar}
              onClick={(e) => handleUdpateAvatar(id, e)}
            >
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardIcons = (props) => {
  const { img, num } = props;
  return (
    <div className={styles.cardIcons}>
      <img src={img} alt="" />
      <p>{num}</p>
    </div>
  );
};

export const CardShop = (props) => {
  const { title, onClick, onClickV2, onClickV3 } = props;

  return (
    <div className={styles.containerCardShop}>
      <div className={styles.cardShop}>
        <div className={styles.imgBx}>
          <img
            src="http://pngimg.com/uploads/running_shoes/running_shoes_PNG5782.png"
            alt="nike-air-shoe"
          />
        </div>
        <div className={styles.contentBx}>
          <h2>Nike Shoes</h2>

          <div className={styles.sizeCard}>
            <h3>Size :</h3>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
          </div>

          <div className={styles.colorCard}>
            <h3>Color :</h3>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <a href="#">Buy Now</a>
        </div>
      </div>
    </div>
  );
};

export const CardsPlansPartner = (props) => {
  const { title, Size, busqueda, servicios, gym } = props;
  return (
    <div className={styles.contPlanPartner}>
      <div className={styles.card}>
        <div className={styles.face1}>
          <div className={styles.content}>
            <span className={styles.stars}></span>
            <div className={styles.plan}>
              <ul>
                <li>{busqueda} de visibilidad</li>
                <li>Panel de control</li>
                <li>Historial de ventas</li>
                <li>Gestios de GYM</li>
                <li>Gestios de servicios</li>
                <li>{gym}</li>
                <li>{servicios}</li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.face2}>
          <h2 style={{ fontSize: Size }}>{title}</h2>
        </div>
      </div>
    </div>
  );
};
