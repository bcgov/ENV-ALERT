/* eslint-disable react/no-array-index-key */
/**
 * @summary Sends validated form and geolocation data to the API for
 *          consumption, or stores in localStorage while offline
 * @author  TylerMaloney, Dallas Richmond
 */
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect, useCallback, FormEvent } from 'react';
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
  StyledMap,
} from './report.styles';
import constants from '../../constants/Constants';
import useAppService from '../../services/app/useAppService';
import { localStorageKeyExists } from '../../utils/AppLocalStorage';
import { reportContent } from '../../content/content';
import { Mapping } from '../../components/utility';
import { LatLng } from 'leaflet';

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
  const [lat, setLat] = useState(parseFloat(state.currentLocation?.lat) || 49.2827);
  const [lng, setLng] = useState(parseFloat(state.currentLocation?.long) || 49.2827);

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
    const isValid = isEventTypeValid && submissionTime && validateDetailBox();
    return isValid;
  }, [eventType, submissionTime, validateDetailBox]);

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
    setSubmissionTime(start || '');
    setExpirationTime(end || '');
  };

  const updateLocation = (loc: LatLng) => {
    setLat(loc.lat);
    setLng(loc.lng);
  };

  const handleGPSLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLng(longitude);
        },
      );
    }
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
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(checkFormValidity()){
      const currentTime = new Date();
      const formData = {
        lat,
        lng,
        submissionTime,
        expirationTime,
        eventType,
        details,
        time: currentTime,
      };

      await axios.post(`${constants.BACKEND_URL}/api/report`, formData)
        .then((res) => {
          setReportSentSuccess(true);
          setSuccessfulReports(res.data);
          setTicketNum(res.data.ticketNum);
          setReportSending(true);

          console.log('successful submit');
          clearFields();
        })
        .catch((err) => {
          setReportSentSuccess(false);
          if (err.code === 'ERR_NETWORK') {
            setErrorMessage(reportContent.reportNetworkFailure[lang]);
          }
        });
    }
  };

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
            <StyledP>{reportContent.locationLabel[lang]}  ({lat.toFixed(4)},{lng.toFixed(4)})</StyledP>
            <StyledMap>
              <Mapping
                locations={[]}
                currentLocation={state.currentLocation}
                onClick={updateLocation}
              />
            </StyledMap>
            <Button
              type="button"
              id="gpsLocation"
              aria-label="Get GPS Location"
              handleClick={handleGPSLocation}
              text="Use My Location"
              disabled={false}
              size='md'
              variant='primary'
            />
          </Section>
          <Section>
            <StyledTextAreaWrapper>
              {eventType === 'Animal Sighting' ? (
                <Section>
                  <StyledTextAreaWrapper>
                    <StyledP>{reportContent.dateLabel[lang]}</StyledP>
                    <DatePicker
                      selected={submissionTime ? new Date(submissionTime) : null}
                      onChange={(date) => setSubmissionTime(date || '')}
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
                      startDate={submissionTime ? new Date(submissionTime) : undefined}
                      endDate={expirationTime ? new Date(expirationTime) : undefined}
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
              disabled={false}
              type='submit'
            />
          </ButtonSection>
        </StyledReportContainer>
      </StyledReportOuterDiv>
    </form>
  );
}
