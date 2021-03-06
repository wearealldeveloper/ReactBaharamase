import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";

import { firestore } from "../config/firebaseConfig";
import { Button } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import Card from "./Card";
import DialogBox from "./DialogBox";

import "../css/play.css";
import "../css/button.css";
import "../css/text.css";

function Play({ sessionID, uid }) {
  console.log("Play page ", uid, sessionID);
  const [currentPlayer, setCurrentPlayer] = useState("11");
  const [users, setUsers] = useState([]);
  const [noofPlayers, setNoOfPlayers] = useState(0);
  // show Winner
  const [showWinner, setShowWinner] = useState(false);
  // window size
  const size = useWindowSize();

  const getSessionUsers = uid => {
    firestore
      .collection("sessions")
      .doc(sessionID)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          setCurrentPlayer(doc.data().currentUser);
          setNoOfPlayers(doc.data().users.length);
          setUsers(doc.data().users);
        } else {
          console.log("no document exist");
        }
      });
  };

  useEffect(() => {
    console.log("Play UseEffect");
    getSessionUsers(uid);
  }, [uid]);

  const turn = async () => {
    const result = await axios.put(
      "https://us-central1-bahramasefirebase.cloudfunctions.net/session/currentUser/" +
        sessionID
    );
    console.log(result);
    return result;
  };

  const endBetting = () => {
    setShowWinner(true);
  };

  const deal = () => {
    alert("deal");
  };

  const endSession = () => {
    setShowWinner(false);
  };

  const playAgain = () => {
    setShowWinner(false);
  };

  return (
    <div>
      {showWinner === true ? (
        <div>
          <Confetti width={size.width} height={size.height} />
          <div className="winner_container">
            <div className="overlay_winner_bottom">
              <button class="game-button" onClick={() => endSession()}>
                End Session
              </button>
              <button class="game-button" onClick={() => playAgain()}>
                Play Again
              </button>
            </div>
            <div className="overlay_winner">
              <p className="winner_text">Winner Winner Simon</p>
            </div>
          </div>
          {/* <DialogBox sessionID={sessionID} /> */}
        </div>
      ) : (
        <p></p>
      )}
      <div className="play_container">
        <div className="play_header">
          <div className="play_header_left">
            <BiArrowBack />
          </div>
          <div className="play_header_center">
            <h3>{currentPlayer}</h3>
          </div>
          <div className="play_header_right">
            <div className="play_header_right_balance">
              <p className="text_bold">Balance</p>
              <p className="text_medium">$ 120</p>
            </div>
          </div>
        </div>
        <div className="play_body">
          {noofPlayers === 1 ? (
            <div className="play_table_border">
              <div className="play_table">
                <div className="user_card_1">
                  <p>{users[0]}</p>
                </div>
              </div>
            </div>
          ) : noofPlayers === 2 ? (
            <div className="play_table_border">
              <div className="play_table">
                <div className="deal_container">
                  <button class="game-button" onClick={() => deal()}>
                    Deal
                  </button>
                </div>
                <div className="user_card_1">
                  <Card
                    sessionID={sessionID}
                    uid={uid}
                    playerUid={users[1]}
                    sequence="2"
                    color="heart"
                  />
                  <p>{users[1]}</p>
                  {users[1] === uid ? (
                    [
                      currentPlayer === users[1] ? (
                        <div>
                          <input placeholder="0"></input>
                          <Button onClick={() => turn()}> Bet</Button>
                        </div>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_2">
                  <Card
                    sessionID={sessionID}
                    uid={uid}
                    playerUid={users[0]}
                    sequence="21"
                    color="heart"
                  />
                  <p>{users[0]}</p>
                  {users[0] === uid ? (
                    [
                      currentPlayer === users[0] ? (
                        <div>
                          <input placeholder="0"></input>
                          <Button onClick={() => turn()}> Bet</Button>
                        </div>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          ) : noofPlayers === 3 ? (
            <div className="play_table_border">
              <div className="play_table">
                <div className="deal_container">
                  <button class="game-button" onClick={() => deal()}>
                    Deal
                  </button>
                </div>
                <div className="user_card_1">
                  <Card
                    sessionID={sessionID}
                    uid={uid}
                    playerUid={users[0]}
                    sequence="21"
                    color="heart"
                  />
                  <p>{users[0]}</p>
                  {users[0] === uid ? (
                    [
                      currentPlayer === users[0] ? (
                        <div>
                          <input placeholder="0"></input>
                          <Button onClick={() => turn()}> Bet</Button>
                        </div>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_6">
                  <Card
                    sessionID={sessionID}
                    uid={uid}
                    playerUid={users[1]}
                    sequence="21"
                    color="heart"
                  />
                  <p>{users[1]}</p>
                  {users[1] === uid ? (
                    [
                      currentPlayer === users[1] ? (
                        <div>
                          <input placeholder="0"></input>
                          <Button onClick={() => turn()}> Bet</Button>
                        </div>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_7">
                  <Card
                    sessionID={sessionID}
                    uid={uid}
                    playerUid={users[2]}
                    sequence="21"
                    color="heart"
                  />
                  <p>{users[2]}</p>
                  {users[2] === uid ? (
                    [
                      currentPlayer === users[2] ? (
                        <div>
                          <input placeholder="0"></input>
                          <Button onClick={() => turn()}>Bet</Button>
                        </div>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          ) : noofPlayers === 4 ? (
            <div className="play_table_border">
              <div className="play_table">
                <div className="user_card_1">
                  <p>{users[0]}</p>
                  {users[0] === uid ? (
                    [
                      currentPlayer === users[0] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_4">
                  <p>{users[1]}</p>
                  {users[1] === uid ? (
                    [
                      currentPlayer === users[1] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_2">
                  <p>{users[2]}</p>
                  {users[2] === uid ? (
                    [
                      currentPlayer === users[2] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_3">
                  <p>{users[3]}</p>
                  {users[3] === uid ? (
                    [
                      currentPlayer === users[3] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          ) : noofPlayers === 5 ? (
            <div className="play_table_border">
              <div className="play_table">
                <div className="user_card_1">
                  <p>{users[0]}</p>
                  {users[0] === uid ? (
                    [
                      currentPlayer === users[0] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_4">
                  <p>{users[1]}</p>
                  {users[1] === uid ? (
                    [
                      currentPlayer === users[1] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_6">
                  <p>{users[2]}</p>
                  {users[2] === uid ? (
                    [
                      currentPlayer === users[2] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_7">
                  <p>{users[3]}</p>
                  {users[3] === uid ? (
                    [
                      currentPlayer === users[3] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_3">
                  <p>{users[4]}</p>
                  {users[4] === uid ? (
                    [
                      currentPlayer === users[4] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          ) : noofPlayers === 6 ? (
            <div className="play_table_border">
              <div className="play_table">
                <div className="user_card_1">
                  <p>{users[0]}</p>
                  {users[0] === uid ? (
                    [
                      currentPlayer === users[0] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_5">
                  <p>{users[1]}</p>
                  {users[1] === uid ? (
                    [
                      currentPlayer === users[1] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_6">
                  <p>{users[2]}</p>
                  {users[2] === uid ? (
                    [
                      currentPlayer === users[2] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_2">
                  <p>{users[3]}</p>
                  {users[3] === uid ? (
                    [
                      currentPlayer === users[3] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_7">
                  <p>{users[4]}</p>
                  {users[4] === uid ? (
                    [
                      currentPlayer === users[4] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="user_card_8">
                  <p>{users[5]}</p>
                  {users[5] === uid ? (
                    [
                      currentPlayer === users[5] ? (
                        <Button onClick={() => turn()}> Turn</Button>
                      ) : (
                        <p>not my turn</p>
                      ),
                    ]
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          ) : noofPlayers < 1 ? (
            <div className="play_table_border">
              <div className="play_table">
                <div className="user_card_error">No Users</div>
              </div>
            </div>
          ) : (
            <div className="play_table_border">
              <div className="play_table">
                <div className="user_card_error">More than 6 Users</div>
              </div>
            </div>
          )}
        </div>
        <div className="play_footer">
          <button class="game-button red" onClick={() => endBetting()}>
            End Betting
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default Play;
