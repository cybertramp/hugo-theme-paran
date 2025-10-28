// Code block copy functionality
document.addEventListener('DOMContentLoaded', function() {
    // Find all pre elements in post content
    const preElements = document.querySelectorAll('.post-content pre');
    
    preElements.forEach(function(pre) {
        // Create wrapper div
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        
        // Wrap the pre element
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-button';
        copyButton.innerHTML = '📋';
        copyButton.setAttribute('aria-label', 'Copy code');
        
        // Create feedback message
        const feedback = document.createElement('span');
        feedback.className = 'copy-feedback';
        feedback.textContent = 'Copied!';
        
        // Add elements to wrapper
        wrapper.appendChild(copyButton);
        wrapper.appendChild(feedback);
        
        // Copy functionality
        copyButton.addEventListener('click', function() {
            const code = pre.querySelector('code');
            const text = code ? code.textContent : pre.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(text).then(function() {
                // Show feedback
                feedback.classList.add('show');
                copyButton.classList.add('copied');
                
                // Hide feedback after 2 seconds
                setTimeout(function() {
                    feedback.classList.remove('show');
                    copyButton.classList.remove('copied');
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy:', err);
            });
        });
    });
});
