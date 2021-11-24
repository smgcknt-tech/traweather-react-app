import { api_get_model as agm } from '../models/api_get_model.js';
import { api_post_model as apm } from '../models/api_post_model.js';
import { getPresignedUrlForS3Image } from '../routes/download_router.js';

export const api_controller = {
  passBody: async (req, res, callback) => {
    await callback(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  passNothing: async (req, res, callback) => {
    await callback()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  passQuery: async (req, res, callback) => {
    await callback(req.query)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  prediction: async (req, res) => {
    const prediction = await agm.get_prediction(req.query);
    const heatmap = await agm.get_market_heatmap(req.query);
    res.json({
      prediction,
      heatmap,
    });
  },
  plan: async (req, res) => {
    const plan = await agm.get_plan(req.query);
    const prediction = await agm.get_prediction(req.query);
    res.json({
      plan,
      prediction,
    });
  },
  feedback: async (req, res) => {
    const plan = await agm.get_plan(req.query);
    const dailyResult = await agm.get_daily_result(req.query);
    res.json({
      plan,
      dailyResult,
    });
  },
  feedback_list: async (req, res) => {
    const results = await agm.get_feedback_list(req.query);
    const feedbacks = await Promise.all(
      results.map(async (feedback) => {
        feedback.image_url = await getPresignedUrlForS3Image(feedback.image_url);
        return feedback;
      })
    );
    res.json(feedbacks);
  },
  create_reflection: async (req, res) => {
    apm
      .create_feed_back(req.body)
      .then(async (results) => {
        const feedbacks = await Promise.all(
          results.map(async (feedback) => {
            feedback.image_url = await getPresignedUrlForS3Image(feedback.image_url);
            return feedback;
          })
        );
        feedbacks.find; // to sort object array
        res.json(feedbacks);
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
