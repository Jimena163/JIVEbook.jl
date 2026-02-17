import { myAccFunc, createCellWithCode, createMDCellWithUI, getVarName, resolveAfterTimeout, updateAllChevrons, closeOtherAccordions } from "./jive_helpers.js"

function createAccordion(title, items, idSuffix) {
    const accButton = document.createElement("button")
    accButton.className = "jv-button jv-block jv-left-align"
    accButton.name = title
    accButton.style.display = "flex"
    accButton.style.justifyContent = "space-between"
    accButton.style.alignItems = "center"
    accButton.style.fontSize = "0.93em"
    accButton.innerHTML = `
        <span style="display:flex;align-items:center;">
            <span>${title}</span>
        </span>
        <img class="chevron" width="15" style="margin-left:auto;" src="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg" 
            data-down="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg"
            data-up="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-up-outline.svg">
    `
    const accContent = document.createElement("div")
    accContent.id = "AccView_" + idSuffix
    accContent.className = "jv-hide jv-card"
    accContent.style.boxShadow = "none"
    accContent.style.margin = "0px 0px 5px 15px"
    accContent.style.fontSize = "0.92em"

    items.forEach((item) => accContent.appendChild(item))

    accButton.onclick = function () {
        closeOtherAccordions(accContent.id, "AccProcess_")
        myAccFunc(accContent.id)
        updateAllChevrons()
    }

    const wrapper = document.createElement("div")
    wrapper.appendChild(accButton)
    wrapper.appendChild(accContent)
    return wrapper
}

function createMenuItem(text, onclick) {
    const a = document.createElement("a")
    a.href = "#"
    a.className = "jv-bar-item jv-button jv-left-align"
    a.style.fontSize = "0.93em"
    a.style.display = "flex"
    a.style.alignItems = "center"
    a.innerHTML = `<span>${text}</span>`
    a.onclick = onclick
    return a
}

export function createViewMenu(timeoutValue) {
    // Main View menu button
    const accButtonView = document.createElement("button")
    accButtonView.className = "jv-button jv-block jv-left-align"
    accButtonView.name = "View"
    accButtonView.style.display = "flex"
    accButtonView.style.justifyContent = "space-between"
    accButtonView.style.alignItems = "center"
    accButtonView.innerHTML = `
        <span style="display:flex;align-items:center;">
            <span style="font-size:0.97em;">View</span>
        </span>
        <img class="chevron" width="15" style="margin-left:auto;" src="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg"
            data-down="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg"
            data-up="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-up-outline.svg">
    `
    accButtonView.onclick = function () {
        closeOtherAccordions(accView.id)
        myAccFunc(accView.id)
        updateAllChevrons()
    }

    // Main View menu container
    const accView = document.createElement("div")
    accView.id = "AccView"
    accView.className = "jv-hide jv-card"
    accView.style.boxShadow = "none"
    accView.style.margin = "0px 0px 5px 15px"

    // 👁️ View / Display
    const viewDisplayItems = [
        createMenuItem("Zoom In", function () {}),
        createMenuItem("Zoom Out", function () {}),
        createMenuItem("Reset Zoom", function () {}),
        createMenuItem("Pan Tool", function () {}),
        createMenuItem("Fit to Cell Width", function () {}),
        createMenuItem("Fit to Original Size", function () {}),
    ]

    // 🎚️ Contrast & Intensity
    const contrastItems = [
        createMenuItem("Auto Contrast", function () {}),
        createMenuItem("Manual Contrast Sliders", function () {}),
        createMenuItem("Brightness Slider", function () {}),
        createMenuItem("Gamma Adjustment", function () {}),
        createMenuItem("Histogram View", function () {}),
    ]

    // 🌈 Colormap & Channels
    const colormapItems = [
        createMenuItem("Set Colormap (e.g., gray, viridis, magma)", function () {}),
        createMenuItem("Toggle Channels", function () {}),
        createMenuItem("Split Channels to Layers", function () {}),
        createMenuItem("Channel Opacity", function () {}),
        createMenuItem("Channel Order", function () {}),
    ]

    // 🪟 Slice & Dimension Control
    const sliceItems = [
        createMenuItem("Z-Slice Slider", function () {}),
        createMenuItem("Timepoint Slider (T)", function () {}),
        createMenuItem("Orthogonal Views", function () {}),
        createMenuItem("Toggle 2D / 3D View", function () {}),
    ]

    // 🏷️ Overlays & Annotations
    const overlayItems = [
        createMenuItem("Show / Hide Overlays", function () {}),
        createMenuItem("ROI Display Toggle", function () {}),
        createMenuItem("Add Annotation Layer", function () {}),
        createMenuItem("Label Transparency", function () {}),
        createMenuItem("Outline Thickness", function () {}),
    ]

    // 📐 Scale & Axes
    const scaleItems = [
        createMenuItem("Show Scale Bar", function () {}),
        createMenuItem("Set Units", function () {}),
        createMenuItem("Toggle Axes", function () {}),
        createMenuItem("Change Pixel Size", function () {}),
    ]

    // 📈 Profiles & Plots
    const profileItems = [
        createMenuItem("Line Profile", async function () {
            const sel_im = getVarName("sel_im")
            const x1 = getVarName("x1")
            const y1 = getVarName("y1")
            const x2 = getVarName("x2")
            const y2 = getVarName("y2")
            
            createMDCellWithUI(
                "Line Intensity Profile",
                `
1. Select image: $(@bind ${sel_im} Select([nothing, image_keys...]))
2. Start X: $(@bind ${x1} NumberField(1:10000, default=100))
3. Start Y: $(@bind ${y1} NumberField(1:10000, default=100))
4. End X: $(@bind ${x2} NumberField(1:10000, default=200))
5. End Y: $(@bind ${y2} NumberField(1:10000, default=200))
            `
            )
        
            await resolveAfterTimeout(timeoutValue * 2)
    
            createCellWithCode(`
if isnothing(${sel_im})
    print("Select an image")
else
    JIVECore.Visualize.plotLine(image_data[${sel_im}],(${x1}, ${y1}),(${x2}, ${y2}),legend=true)
end`)

            await resolveAfterTimeout(timeoutValue * 2)

            createCellWithCode(`
if !isnothing(${sel_im})
    img = image_data[${sel_im}]
    img_line = copy(img)
    
    JIVECore.Visualize.gif(JIVECore.Draw.draw_line(img_line,(${x1}, ${y1}),(${x2}, ${y2}),5,value=1))
    
end`) 
        }),
    ]   

    // Add accordions to menu
    accView.appendChild(createAccordion("👁️ Display", viewDisplayItems, "display"))
    accView.appendChild(createAccordion("🎚️ Contrast", contrastItems, "contrast"))
    accView.appendChild(createAccordion("🌈 Color", colormapItems, "color"))
    accView.appendChild(createAccordion("🪟 Slice", sliceItems, "slice"))
    accView.appendChild(createAccordion("🏷️ Overlays", overlayItems, "overlay"))
    accView.appendChild(createAccordion("📐 Axes", scaleItems, "axes"))
    accView.appendChild(createAccordion("📈 Profiles", profileItems, "profiles"))
    

    // Add a line at the end
    const hr = document.createElement("hr")
    hr.style.margin = "12px 0 0 0"
    accView.appendChild(hr)

    // Wrap button and menu
    const itemBarView = document.createElement("div")
    itemBarView.appendChild(accButtonView)
    itemBarView.appendChild(accView)

    return itemBarView
}
