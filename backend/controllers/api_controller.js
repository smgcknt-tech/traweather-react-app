import { api_get_model  as agm} from "../models/api_get_model.js";

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
};
