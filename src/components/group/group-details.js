import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getGroup } from "../../services/group-services";
import User from "../user/user";
import { joinGroup, leaveGroup } from "../../services/group-services";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Comments from "../comments/comments";
import EventList from "../events/event-list";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useTheme } from "@mui/material/styles";

function GroupDetails() {
  const theme = useTheme();
  const { authData } = useAuth();
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isGroup, setInGroup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      await getGroup(id)
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((e) => {
          setError(true);
          setLoading(false);
        });
    };
    getData();
  }, [id]);

  useEffect(() => {
    if (data?.members) {
      if (authData?.user) {
        setInGroup(
          !!data.members.find((member) => member.user.id === authData.user.id)
        );
        setIsAdmin(
          data.members.find((member) => member.user.id === authData.user.id)
            ?.admin
        );
      }
    }
    setGroup(data);
  }, [data, authData.user]);

  const joinHere = () => {
    joinGroup({ user: authData.user.id, group: group.id }).then((res) => {});
  };

  const leaveHere = () => {
    leaveGroup({ user: authData.user.id, group: group.id }).then((res) => {});
  };

  const addEvent = () => {
    navigate("/event-form", { group });
  };

  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <Link to={`/`}>
        <ChevronLeftIcon />
      </Link>
      {group && (
        <React.Fragment>
          <h1>
            {group.name} {group.location}
          </h1>
          <h2>{group.description}</h2>
          {isGroup ? (
            <Button
              onClick={() => leaveHere()}
              variant="contained"
              color="primary"
            >
              Leave Group
            </Button>
          ) : (
            <Button
              onClick={() => joinHere()}
              variant="contained"
              color="primary"
            >
              Join Group
            </Button>
          )}
          {isAdmin && (
            <Button
              onClick={() => addEvent()}
              variant="contained"
              color="primary"
            >
              Add new Event
            </Button>
          )}

          <EventList events={group.events} />

          <br />
          <h3>Members:</h3>
          {group.members.map((member) => {
            return (
              <div
                key={member.id}
                style={{
                  fontSize: "18px",
                  marginRight: "3px",
                  marginTop: "10px",
                  color: theme.colors.mainAccentColor,
                }}
              >
                <User user={member.user} />
                <p>{member.points}pts</p>
              </div>
            );
          })}

          <Comments group={group} />
        </React.Fragment>
      )}
    </div>
  );
}

export default GroupDetails;
