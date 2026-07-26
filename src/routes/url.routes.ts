import { Router } from "express";
import { createShortUrlController, redirectToOriginalUrl, getUrlDetailsController } from "../controllers/url.controller";
import { validate } from "../middleware/validate.middleware";
import { createShortUrlSchema } from "../validations/url.validation";

const router = Router();


/**
 * @swagger
 * /api/v1/urls:
 *   post:
 *     summary: Create a shortened URL
 *     tags:
 *       - URL Shortener
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: https://www.google.com
 *     responses:
 *       201:
 *         description: Short URL created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 originalUrl:
 *                   type: string
 *                 shortCode:
 *                   type: string
 *                 clicks:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 */
router.post(
    "/",
    validate(createShortUrlSchema),
    createShortUrlController
);


/**
 * @swagger
 * /api/v1/urls/details/{shortCode}:
 *   get:
 *     summary: Get URL analytics/details
 *     tags:
 *       - URL Shortener
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         example: aBc123
 *     responses:
 *       200:
 *         description: URL details returned successfully
 *       404:
 *         description: Short URL not found
 */
router.get(
    "/details/:shortCode",
    getUrlDetailsController
);


/**
 * @swagger
 * /api/v1/urls/{shortCode}:
 *   get:
 *     summary: Redirect to the original URL
 *     tags:
 *       - URL Shortener
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         example: aBc123
 *     responses:
 *       302:
 *         description: Redirects to original URL
 *       404:
 *         description: Short URL not found
 */
router.get("/:shortCode", redirectToOriginalUrl);

export default router;