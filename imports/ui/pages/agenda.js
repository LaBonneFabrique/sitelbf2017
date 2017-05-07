import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';
import 'fullcalendar/dist/locale/fr';
import { Jumbotron } from 'react-bootstrap';
import Agenda from '../containers/agenda.js';



export const planningAgenda = () => (
  <Jumbotron className="text-center">
    <Agenda />
  </Jumbotron>
);