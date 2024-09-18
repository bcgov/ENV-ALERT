/* eslint-disable react/no-array-index-key */
/**
 * @summary Sends validated form and geolocation data to the API for
 *          consumption, or stores in localStorage while offline
 * @author  TylerMaloney, Dallas Richmond
 */
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../../components/common';
import {
  StyledReportContainer,
  StyledReportOuterDiv,
  StyledTextArea,
  StyledTextAreaWrapper,
  Section,
  ButtonSection,
  StyledSelect,
  StyledInput,
  StyledP,
  StyledCharacterCounter,
  ErrorP,
  SuccessP,
  HeaderContainer,
  StyledHeaderTwo,
} from './report.styles';
import constants from '../../constants/Constants';
import useAppService from '../../services/app/useAppService';
import { localStorageKeyExists } from '../../utils/AppLocalStorage';
import OnlineCheck from '../../utils/OnlineCheck';
import { reportContent } from '../../content/content';

export default function Report() {
  const charLimit = 256;
  const minCharLimit = 10;
  const [eventType, setEventType] = useState('');
  const [details, setDetails] = useState('');
  const [submissionTime, setSubmissionTime] = useState<Date | ''>('');
  const [expirationTime, setExpirationTime] = useState<Date | ''>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [reportSending, setReportSending] = useState(false);
  const [reportSentSuccess, setReportSentSuccess] = useState(false);
  const [ticketNum, setTicketNum] = useState(null);
  const {
    state,
    setAnalytics,
    setSuccessfulReports,
    setOfflineReports,
  } = useAppService();
  const { lang } = state.settings;
  const geolocationKnown = localStorageKeyExists(constants.CURRENT_LOCATION_KEY);
  const latitude = state.currentLocation ? state.currentLocation.lat : 49.2827;
  const longitude = state.currentLocation ? state.currentLocation.long : -123.2;
  const [startDate, setStartDate] = useState(null);

  /**
   * @desc - Validates the detail input is longer than the minumum length, or not present.
   * @returns {boolean} - Indicates whether the message inputted is over the
   *                      character minimum, but under the maximum.
   */
  const validateDetailBox = useCallback((): boolean => {
    if (details.length >= minCharLimit && details.length <= charLimit) {
      return true;
    }
    setErrorMessage(reportContent.minLengthValidationFailure[lang]);
    setReportSentSuccess(false);
    return false;
  }, [details, charLimit, lang]);

  /**
   * @desc - Validates all form fields to ensure they contain valid values.
   * @param {boolean} isValid - Indicates whether the form fields are valid (true)
   *                            or not valid (false).
   * @returns {boolean}       - Returns isValid, set to either true or false.
   */
  const checkFormValidity = useCallback(() => {
    const isEventTypeValid = !!eventType;
    const isValid = isEventTypeValid && validateDetailBox();
    return isValid;
  }, [eventType, validateDetailBox]);

  const handleEventTypeChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setEventType(e.target.value);
  };

  const handleDetailsChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    if (e.target.value.length <= charLimit) {
      setDetails(e.target.value);
    }
  };

  const handleDateChange = (range: [Date | null, Date | null]) => {
    const [start, end] = range;
    setSubmissionTime(start ? start : '');
    setExpirationTime(end ? end : '');
  };

  const clearFields = () => {
    setErrorMessage('');
    setSubmissionTime('');
    setExpirationTime('');
    setEventType('');
    setDetails('');
  };

  /**
   * @desc - Sends a "formData" object to the /report endpoint.
   *       - Form validity is determined externally through the useEffect below.
   */
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

  const handleSubmissionTimeChange = (date: Date | null) => {
      setSubmissionTime(date); // date can be Date or null
  };

    const currentTime = new Date();
    const formData = {
      latitude,
      longitude,
      submissionTime,
      expirationTime,
      eventType,
      details,
      time: currentTime,
    };

    clearFields();

    if (state.settings.analytics_opt_in && geolocationKnown) {
      const analytics = {
        latitude,
        longitude,
        usage: {
          function: 'report',
        },
      };

      if (state.settings.offline_mode) {
        setAnalytics(false, analytics);
      } else {
        OnlineCheck()
          .then((Online) => {
            setAnalytics(Online, analytics);
          });
      }
    }
    setReportSending(false);
  };

  useEffect(() => {
    setIsFormValid(checkFormValidity());
  }, [checkFormValidity]);

  return (
    <form onSubmit={handleSubmit}>
      <StyledReportOuterDiv>
        <StyledReportContainer>
          <HeaderContainer>
            <StyledHeaderTwo>{reportContent.reportLabel[lang]}</StyledHeaderTwo>
            <NavLink to="/report/history">
              <Button
                text={reportContent.history[lang]}
                size="sm"
                variant="primary"
                disabled={false}
              />
            </NavLink>
          </HeaderContainer>
          <Section>
            <StyledP>{reportContent.eventTypeLabel[lang]}</StyledP>
            <StyledSelect
              id="eventType"
              aria-label="event select"
              value={eventType}
              onChange={handleEventTypeChange}
              required
            >
              <option value="">{reportContent.eventTypeOptionLabel[lang]}</option>
              {reportContent.reportOptions[lang].map((event: string, index: number) => (
                <option value={reportContent.reportOptions.eng[index]} key={index}>
                  {event}
                </option>
              ))}
            </StyledSelect>
          </Section>
          <Section>
            <StyledTextAreaWrapper>
              {eventType === 'Animal Sighting' ? (
                <Section>
                  <StyledTextAreaWrapper>
                    <StyledP>{reportContent.dateLabel[lang]}</StyledP>
                    <DatePicker
                      selected={submissionTime ? new Date(submissionTime) : null}
                      onChange={date => setSubmissionTime(date)}
                      dateFormat="yyyy/MM/dd"
                      minDate={new Date()} // Optional: Set minimum date
                      inline
                    />
                  </StyledTextAreaWrapper>
                </Section>
              ) : (
                <Section>
                  <StyledTextAreaWrapper>
                    <StyledP>{reportContent.dateRangeLabel[lang]}</StyledP>
                    <DatePicker
                      selected={submissionTime ? new Date(submissionTime) : null}
                      onChange={handleDateChange}
                      selectsRange
                      startDate={submissionTime ? new Date(submissionTime) : null}
                      endDate={expirationTime ? new Date(expirationTime) : null}
                      dateFormat="yyyy/MM/dd"
                      inline
                    />
                  </StyledTextAreaWrapper>
                </Section>
              )}
            </StyledTextAreaWrapper>
          </Section>
          <Section>
            <StyledTextAreaWrapper>
              <StyledP>{reportContent.detailsLabel[lang]}</StyledP>
              <StyledTextArea
                id="details"
                aria-label="Event details field"
                value={details}
                onChange={handleDetailsChange}
                onBlur={validateDetailBox}
                rows={5}
                cols={25}
                placeholder={reportContent.enterDetails[lang]}
                required
              />
              <StyledCharacterCounter>{`${details.length} / ${charLimit}`}</StyledCharacterCounter>
            </StyledTextAreaWrapper>
          </Section>
          <ButtonSection>
            <Button
              text={reportContent.submit[lang]}
              variant="primary"
              size="md"
              disabled={!reportSending && !isFormValid}
            />
          </ButtonSection>
        </StyledReportContainer>
      </StyledReportOuterDiv>
    </form>
  );
}
