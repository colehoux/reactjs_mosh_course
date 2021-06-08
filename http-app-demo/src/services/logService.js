import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://bc8fe78b2b4940b7830178b7e50fc554@o614653.ingest.sentry.io/5749721",
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0,
    });
}

function log(error) {
    Sentry.captureException(error);
}

export default {
    init,
    log,
};
