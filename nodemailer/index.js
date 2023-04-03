const nodemailer = require("nodemailer");
const ics = require("ics");

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
};

const send = async (data) => {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info.response;
    }
  });
};

const sendWithIcs = async (data, event) => {
  ics.createEvent(event, async (err, value) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(value);
    // BEGIN:VCALENDAR
    // VERSION:2.0
    // CALSCALE:GREGORIAN
    // PRODID:adamgibbons/ics
    // METHOD:PUBLISH
    // X-PUBLISHED-TTL:PT1H
    // BEGIN:VEVENT
    // UID:nxL8SXF1HqaayFsZc8V7A
    // SUMMARY:Node.js 스터디 모임
    // DTSTAMP:20220622T063100Z
    // DTSTART:20220630T003000Z
    // DESCRIPTION:개발자의 품격 스터디 모임
    // URL:https://thegreat.io
    // GEO:30.12;50.45
    // LOCATION:제주특별자치도 제주시 더그레잇 3층
    // ORGANIZER;CN=Seungwon Go:mailto:seungwon.go@gmail.com
    // ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;CN=유재석:mailto:ryu@gmail.com
    // ATTENDEE;RSVP=FALSE;ROLE=OPT-PARTICIPANT;CN=김종국:mailto:kim@gamil.com
    // DURATION:PT1H30M
    // END:VEVENT
    // END:VCALENDAR
    const message = {
      ...data,
      icalEvent: {
        filename: "invitation.ics", // iCalendar 파일
        method: "REQUEST",
        content: value,
      },
    };

    await send(message);
  });
};

module.exports = {
  send,
  sendWithIcs,
};
