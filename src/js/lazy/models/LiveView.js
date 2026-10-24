Ext.define('Tualo.pugBrowser.lazy.models.LiveView', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tualo_pugbrowser_liveview',
    data: {
        jobid: null,
        jobnumber: null,

        targetJobId: null,

        copyJobData: true,
        copyTechnicalData: false,
        copyCalculation: false,

        copyJobDataDone: false,
        copyTechnicalDataDone: false,
        copyCalculationDone: false,


    }
});