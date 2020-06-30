/*global $, document, window, setTimeout, navigator, console, location*/

$(document).ready(function () {
    "use strict";
  
    var usernameError = true,
      emailError = true,
      passwordError = true,
      passConfirm = true;

  
    // Detect browser for css purpose
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
      $(".form form label").addClass("fontSwitch");
    }

        // label effect
        if ($(this).val().length > 0) {
          $(this).siblings("label").addClass("active");
        } else {
          $(this).siblings("label").removeClass("active");
        }
  
  
    // form switch
    $("a.switch").click(function (e) {
      $(this).toggleClass("active");
      e.preventDefault();
  
      if ($("a.switch").hasClass("active")) {
        $(this)
          .parents(".form-peice")
          .addClass("switched")
          .siblings(".form-peice")
          .removeClass("switched");
      } else {
        $(this)
          .parents(".form-peice")
          .removeClass("switched")
          .siblings(".form-peice")
          .addClass("switched");
      }
    }); 
    
    // Login steps code

    const checkButtons = (activeStep, stepsCount) => {
      const prevBtn = $("#wizard-pre");
      const nextBtn = $("#wizard-nxt");
      const submBtn = $("#wizard-sub");
    
      switch (activeStep / stepsCount) {
        case 0: // First Step
          prevBtn.hide();
          submBtn.hide();
          nextBtn.show();
          break;
        case 1: // Last Step
          nextBtn.hide();
          prevBtn.show();
          submBtn.show();
          break;
        default:
          submBtn.hide();
          prevBtn.show();
          nextBtn.show();
      }
    };
    
    // Scrolling the form to the middle of the screen if the form
    // is taller than the viewHeight
    const scrollWindow = (activeStepHeight, viewHeight) => {
      if (viewHeight < activeStepHeight) {
        $(window).scrollTop($(steps[activeStep]).offset().top - viewHeight / 2);
      }
    };
    
    // Setting the wizard body height, this is needed because
    // the steps inside of the body have position: absolute
    const setWizardHeight = activeStepHeight => {
      $(".wizard-bdy").height(activeStepHeight);
    };
    
    $(function() {
      // Form step counter (little cirecles at the top of the form)
      const wizardSteps = $(".wizard-headr .wizard-stp");
      // Form steps (actual steps)
      const steps = $(".wizard-bdy .stp");
      // Number of steps (counting from 0)
      const stepsCount = steps.length - 1;
      // Screen Height
      const viewHeight = $(window).height();
      // Current step being shown (counting from 0)
      let activeStep = 0;
      // Height of the current step
      let activeStepHeight = $(steps[activeStep]).height();
    
      checkButtons(activeStep, stepsCount);
      setWizardHeight(activeStepHeight);
      
      // Resizing wizard body when the viewport changes
      $(window).resize(function() {
        setWizardHeight($(steps[activeStep]).height());
      });
    
      // Previous button handler
      $("#wizard-pre").click(() => {
        // Sliding out current step
        $(steps[activeStep]).removeClass("activ");
        $(wizardSteps[activeStep]).removeClass("activ");
    
        activeStep--;
        
        // Sliding in previous Step
        $(steps[activeStep]).removeClass("of").addClass("activ");
        $(wizardSteps[activeStep]).addClass("activ");
    
        activeStepHeight = $(steps[activeStep]).height();
        setWizardHeight(activeStepHeight);
        checkButtons(activeStep, stepsCount);
      });
    
      // Next button handler
      $("#wizard-nxt").click(() => {
        // Sliding out current step
        $(steps[activeStep]).removeClass("initl").addClass("of").removeClass("activ");
        $(wizardSteps[activeStep]).removeClass("activ");
    
        // Next step
        activeStep++;
        
        // Sliding in next step
        $(steps[activeStep]).addClass("activ");
        $(wizardSteps[activeStep]).addClass("activ");
    
        activeStepHeight = $(steps[activeStep]).height();
        setWizardHeight(activeStepHeight);
        checkButtons(activeStep, stepsCount);
      });
    });

  });
  
  











  