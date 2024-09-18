/**
 * @summary Controller for Project Y submit advisory mechanism.
 *          designed to take user reports from the application and store in database

 */
import { Response, Request } from 'express';
import mongoose from 'mongoose';
import httpResponses from '../utils/httpResponse';
import validationErrorHandler from '../utils/validationErrorHandler';

const advisoryModel = mongoose.model('advisory');

export const submitAdvisory = async (req: Request, res: Response) => {
  await advisoryModel.create(req.body)
    .then(async (newEntry) => {
      if (newEntry.eventType === 'APITest') {
        // eslint-disable-next-line no-underscore-dangle
        await advisoryModel.deleteOne({ _id: newEntry._id });
      }
      return res.status(201).send(newEntry);
    })
    .catch((error: Error) => res.status(400).json(validationErrorHandler(error)));
};

/**
 */
export const getAdvisories = async (req: Request, res: Response) => {
  try {
    const advisories = await advisoryModel.find({});
    res.status(200).json(advisories);
  } catch (ex) {
    res.status(500).send(httpResponses[500]);
  }
};
