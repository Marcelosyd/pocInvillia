import React, { Component } from "react";
import Styles from "./styles.module.css";
import Axios from "axios";
import { Modal } from "react-bootstrap";
import { GOOGLE_SCE_API_KEY, GOOGLE_SCE_CX_KEY } from "../../services/api";

export default class CharacterCard extends Component {
  state = {
    starshipsList: [],
    starshipsModalVisible: false,
    bgImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTWchlquRxeF2JQkhfOfI3GfCJWYkneSp0O0vw0vxBGQSxykfKv"
  };

  componentDidMount() {
    this.loadStarships();
    this.getImage();
  }

  handleClose = () => this.setState({ starshipsModalVisible: false });
  handleShow = () => this.setState({ starshipsModalVisible: true });

  loadStarships() {
    this.props.character.starships.forEach(starship => {
      Axios({
        method: "GET",
        url: starship
      }).then(res => {
        this.setState({
          starshipsList: [...this.state.starshipsList, res.data]
        });
      });
    });
  }

  getImage() {
    Axios({
      method: "GET",
      url: "https://www.googleapis.com/customsearch/v1",
      params: {
        q: this.props.character.name,
        num: 1,
        imgSize: "medium",
        searchType: "image",
        filetype: "jpg",
        key: GOOGLE_SCE_API_KEY,
        cx: GOOGLE_SCE_CX_KEY
      }
    }).then(res => {
      this.setState({
        bgImg: res.data.items[0].link
      });
    });
  }

  render() {
    console.log(this.props.character);
    return (
      <div className={Styles.card + " card"}>
        <div className={" card-body p-0"}>
          <div
            className={Styles.cardTitle + " card-title m-0 p-2"}
            style={{
              backgroundImage: `url(${this.state.bgImg})`,
              backgroundSize: "100% 100%"
            }}
          >
            <h5>{this.props.character.name}</h5>
          </div>
          <div className={Styles.cardText + " card-text p-2 pt-2"}>
            <div className="row p-2 d-flex justify-content-center">
              <div
                className={
                  Styles.info +
                  " col-5 d-flex align-items-center justify-content-center"
                }
              >
                <strong>Altura: </strong>
                {this.props.character.height}
              </div>
              <div
                className={
                  Styles.info +
                  " col-5 d-flex align-items-center justify-content-center"
                }
              >
                <strong>Peso: </strong>
                {this.props.character.mass}
              </div>
            </div>
            <div className="row p-2 d-flex justify-content-center">
              <div
                className={
                  Styles.info +
                  " col-5 d-flex align-items-center justify-content-center"
                }
              >
                <strong>Cabelos: </strong>
                {this.props.character.hair_color.split(",")[0]}
              </div>
              <div
                className={
                  Styles.info +
                  " col-5 d-flex align-items-center justify-content-center"
                }
              >
                <strong>Pele: </strong>
                {this.props.character.skin_color.split(",")[0]}
              </div>
            </div>
            <div className="row p-2 d-flex justify-content-center">
              <div
                className={
                  Styles.info +
                  " col-5 d-flex align-items-center justify-content-center"
                }
              >
                <strong>Olhos: </strong>
                {this.props.character.eye_color}
              </div>
              <div
                className={
                  Styles.info +
                  " col-5 d-flex align-items-center justify-content-center"
                }
              >
                <strong>Gênero: </strong>
                {this.props.character.gender}
              </div>
            </div>
          </div>
          <div className={Styles.cardFooter + " text-center"}>
            <div
              type="button"
              className={Styles.starshipButton + " mx-auto"}
              onClick={
                this.state.starshipsList.length > 0 ? this.handleShow : null
              }
              disable={!this.state.starshipsList}
            >
              {this.state.starshipsList.length > 0 && "Starships List"}
              {this.state.starshipsList.length === 0 && "No Starships"}
            </div>
          </div>
        </div>

        <Modal
          show={this.state.starshipsModalVisible}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Starships</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.starshipsList &&
              this.state.starshipsList.map((starship, idx) => (
                <div className={Styles.starship + " mx-auto"}>
                  <div className="row border-bottom p-2 m-0">
                    <strong>{starship.name}</strong>
                  </div>
                  <div className="row p-2 m-0 mt-2">
                    <div className="col-12">
                      <strong>Modelo:</strong> {starship.model}
                    </div>
                    <div className="col-12">
                      <strong>Fabricante:</strong> {starship.manufacturer}
                    </div>
                    <div className="col-12">
                      <strong>Custo em créditos:</strong>{" "}
                      {starship.cost_in_credits}
                    </div>
                    <div className="col-12">
                      <strong>Comprimento:</strong> {starship.length}
                    </div>
                    <div className="col-12">
                      <strong>Velocidade máxima:</strong>{" "}
                      {starship.max_atmosphering_speed}
                    </div>
                    <div className="col-12">
                      <strong>Tripulação:</strong> {starship.crew}
                    </div>
                    <div className="col-12">
                      <strong>Passageiros:</strong> {starship.passengers}
                    </div>
                    <div className="col-12">
                      <strong>Capacidade de carga:</strong>{" "}
                      {starship.cargo_capacity}
                    </div>
                    <div className="col-12">
                      <strong>Consumíveis:</strong> {starship.consumables}
                    </div>
                    <div className="col-12">
                      <strong>Rating:</strong> {starship.hyperdrive_rating}
                    </div>
                    <div className="col-12">
                      <strong>Classe:</strong> {starship.starship_class}
                    </div>
                  </div>
                </div>
              ))}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

/* 
<strong>Starships:</strong>
            <div className="text-center p-0 m-0">
              {this.state.starshipsList &&
                this.state.starshipsList.map((starship, idx) => (
                  <OverlayTrigger
                    key={idx}
                    trigger="click"
                    placement="right"
                    overlay={
                      <Popover id="popover-basic">
                        <Popover.Title as="h3">{starship.name}</Popover.Title>
                        <Popover.Content>
                          
                        </Popover.Content>
                      </Popover>
                    }
                    rootClose={true}
                  >
                    <div className={Styles.starship + " mx-auto"}>
                      {starship.name}
                    </div>
                  </OverlayTrigger>
                ))}
            </div> */
