import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isToday, format } from 'date-fns';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get(`/appointments/me`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAppointments(response.data);
      });
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    return monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, 'MMMM dd');
  }, [selectedDate]);

  const selectedWeekDayAsText = useMemo(() => {
    return format(selectedDate, 'cccc');
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Welcome,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Appointments</h1>
          <p>
            {isToday(selectedDate) && <span>Today</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDayAsText}</span>
          </p>

          <NextAppointment>
            <strong>Next</strong>
            <div>
              <img src={user.avatar_url} alt={user.name} />
              <strong>{user.name}</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>At Morning</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />
                <strong>{user.name}</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />
                <strong>{user.name}</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>In the Afternoon</strong>
            <Appointment>
              <span>
                <FiClock />
                14:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />
                <strong>{user.name}</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
