import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { DateTime } from "luxon";
import { createEvent } from "../../services/event-services";
import { useAuth } from "../../hooks/useAuth";
import { NotificationManager } from "react-notifications";
import { ChevronLeftIcon } from "@mui/icons-material";

export default function EventForm() {
  const { authData } = useAuth();
  const { state } = useLocation();
  const { group } = state;
  const history = useHistory();
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [time, setTime] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //2021-06-30T22:00
    const format = "yyyy-MM-dd'T'HH:mm";
    const utcTime = DateTime.fromFormat(time, format).toUTC().toFormat(format);
    const dataToSend = { team1, team2, time: utcTime, group: group.id };
    const eventData = await createEvent(authData.token, dataToSend);
    if (eventData) {
      NotificationManager.success("Event created");
      history.push("/details/" + group.id);
    } else {
      NotificationManager.error("Error creating event. Please try agian later");
    }
  };

  return (
    <div>
      <Link to={`/details/${group.id}`}>
        <ChevronLeftIcon />
      </Link>
      <h3>New event for a group {group.name}</h3>
      <form onSubmit={handleSubmit}>
        <TextField label="Team 1" onChange={(e) => setTeam1(e.target.value)} />
        <TextField label="Team 2" onChange={(e) => setTeam2(e.target.value)} />
        <br />
        <br />
        <TextField
          label="Date and time of event"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setTime(e.target.value)}
        />
        <br />
        <br />
        <Button variant="contained" color="primary" type="submit">
          Create Event
        </Button>
      </form>
    </div>
  );
}
