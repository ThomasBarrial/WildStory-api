const bodyValidator =
  (schema: any) => async (req: any, res: any, next: any) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      res.status(422);
      next(error);
    }
  };

export default bodyValidator;
