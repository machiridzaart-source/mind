/**
 * Brain Search Module
 * Extends BrainVisualizer with search functionality
 * Maps brain regions to troubleshooting guides
 */

class BrainSearch extends BrainVisualizer {
  constructor(containerSelector, options = {}) {
    super(containerSelector, options);
    this.searchMatches = [];
    this.selectedMatch = null;
    this.knowledgeBase = this.initializeKnowledgeBase();
  }

  /**
   * Initialize troubleshooting knowledge base
   * Maps brain regions to issues and solutions
   */
  initializeKnowledgeBase() {
    return {
      'Prefrontal Cortex': {
        keywords: ['decision', 'focus', 'planning', 'memory', 'executive', 'function', 'attention'],
        issues: [
          { title: 'Unable to Make Decisions', symptoms: 'Difficulty choosing options or deciding on actions' },
          { title: 'Poor Focus and Concentration', symptoms: 'Can\'t maintain attention on tasks' },
          { title: 'Planning Issues', symptoms: 'Difficulty organizing steps to reach goals' }
        ]
      },
      'Dorsolateral PFC': {
        keywords: ['working', 'memory', 'planning', 'problem', 'solving', 'logic'],
        issues: [
          { title: 'Working Memory Problems', symptoms: 'Difficulty holding information in mind' },
          { title: 'Problem Solving Difficulties', symptoms: 'Trouble working through complex problems' }
        ]
      },
      'Primary Motor Cortex': {
        keywords: ['movement', 'motor', 'paralysis', 'weakness', 'coordination', 'tremor'],
        issues: [
          { title: 'Movement Difficulty', symptoms: 'Weakness or coordination problems' },
          { title: 'Tremors', symptoms: 'Involuntary shaking or trembling' },
          { title: 'Motor Coordination Loss', symptoms: 'Difficulty with fine motor control' }
        ]
      },
      'Primary Somatosensory Cortex': {
        keywords: ['sensation', 'numbness', 'tingling', 'touch', 'pain', 'sensitivity'],
        issues: [
          { title: 'Numbness or Tingling', symptoms: 'Loss of sensation or abnormal feelings' },
          { title: 'Pain Perception Issues', symptoms: 'Altered pain sensation' },
          { title: 'Touch Sensitivity', symptoms: 'Over or under sensitivity to touch' }
        ]
      },
      'Primary Visual Cortex': {
        keywords: ['vision', 'sight', 'visual', 'blind', 'blurred', 'dark', 'light', 'scotoma'],
        issues: [
          { title: 'Vision Loss', symptoms: 'Partial or complete vision problems' },
          { title: 'Blurred Vision', symptoms: 'Unclear or fuzzy vision' },
          { title: 'Visual Field Defect', symptoms: 'Missing areas in visual field' }
        ]
      },
      'Primary Auditory Cortex': {
        keywords: ['hearing', 'deaf', 'tinnitus', 'sound', 'noise', 'audio'],
        issues: [
          { title: 'Hearing Loss', symptoms: 'Reduced ability to hear sounds' },
          { title: 'Tinnitus', symptoms: 'Ringing in the ears' },
          { title: 'Sound Distortion', symptoms: 'Difficulty understanding speech' }
        ]
      },
      'Wernicke Area': {
        keywords: ['language', 'comprehension', 'understanding', 'speech', 'fluency', 'aphasia'],
        issues: [
          { title: 'Language Comprehension Loss', symptoms: 'Difficulty understanding spoken language' },
          { title: 'Language Fluency Issues', symptoms: 'Trouble producing fluent speech' },
          { title: 'Speech Understanding', symptoms: 'Can\'t follow conversations' }
        ]
      },
      'Broca Area': {
        keywords: ['speech', 'speaking', 'articulation', 'fluency', 'language', 'expression'],
        issues: [
          { title: 'Speech Production Difficulty', symptoms: 'Trouble speaking or words stuck' },
          { title: 'Articulation Problems', symptoms: 'Unclear or slurred speech' }
        ]
      },
      'Hippocampus': {
        keywords: ['memory', 'forget', 'amnesia', 'learning', 'recall', 'consolidation'],
        issues: [
          { title: 'Memory Loss', symptoms: 'Difficulty remembering recent events' },
          { title: 'Learning Difficulties', symptoms: 'Hard to form new memories' },
          { title: 'Recall Problems', symptoms: 'Can\'t retrieve stored information' }
        ]
      },
      'Amygdala': {
        keywords: ['emotion', 'anxiety', 'fear', 'stress', 'panic', 'emotional', 'fear'],
        issues: [
          { title: 'Anxiety Disorders', symptoms: 'Excessive worry or fear responses' },
          { title: 'Panic Attacks', symptoms: 'Sudden intense fear episodes' },
          { title: 'Emotional Dysregulation', symptoms: 'Difficulty managing emotions' }
        ]
      },
      'Anterior Cingulate': {
        keywords: ['emotion', 'regulation', 'error', 'monitoring', 'decision', 'conflict'],
        issues: [
          { title: 'Emotional Regulation Issues', symptoms: 'Difficulty managing emotional responses' },
          { title: 'Conflict Resolution', symptoms: 'Trouble resolving conflicting thoughts' }
        ]
      },
      'Cerebellum': {
        keywords: ['balance', 'coordination', 'ataxia', 'dizziness', 'vertigo', 'movement'],
        issues: [
          { title: 'Loss of Balance', symptoms: 'Difficulty maintaining balance' },
          { title: 'Coordination Problems', symptoms: 'Clumsy or uncoordinated movements' },
          { title: 'Dizziness or Vertigo', symptoms: 'Spinning sensation or imbalance' }
        ]
      },
      'Thalamus': {
        keywords: ['relay', 'sensory', 'relay', 'pain', 'consciousness', 'awareness'],
        issues: [
          { title: 'Sensory Integration Problems', symptoms: 'Difficulty processing multiple senses' },
          { title: 'Consciousness Issues', symptoms: 'Altered awareness or alertness' }
        ]
      },
      'Hypothalamus': {
        keywords: ['hormone', 'temperature', 'hunger', 'sleep', 'appetite', 'metabolism'],
        issues: [
          { title: 'Sleep Disorders', symptoms: 'Insomnia or excessive sleepiness' },
          { title: 'Appetite Changes', symptoms: 'Unusual hunger or loss of appetite' },
          { title: 'Hormonal Imbalance', symptoms: 'Temperature regulation or hormone issues' }
        ]
      },
      'Pituitary Gland': {
        keywords: ['hormone', 'endocrine', 'growth', 'reproduction', 'metabolism'],
        issues: [
          { title: 'Hormonal Imbalance', symptoms: 'Growth, reproduction, or metabolic issues' },
          { title: 'Endocrine Dysfunction', symptoms: 'Hormone level problems' }
        ]
      },
      'Substantia Nigra': {
        keywords: ['motor', 'movement', 'parkinson', 'dopamine', 'tremor', 'rigidity'],
        issues: [
          { title: 'Parkinson\'s Symptoms', symptoms: 'Tremor, rigidity, or slow movement' },
          { title: 'Dopamine Deficiency', symptoms: 'Movement and mood problems' }
        ]
      },
      'Anterior Hippocampus': {
        keywords: ['memory', 'emotional', 'context', 'recall', 'learning'],
        issues: [
          { title: 'Emotional Memory Issues', symptoms: 'Trouble remembering emotional events' },
          { title: 'Context Memory Loss', symptoms: 'Difficulty remembering context of events' }
        ]
      }
    };
  }

  /**
   * Search brain and knowledge base
   */
  searchBrain(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      this.clearSearch();
      return [];
    }

    this.searchMatches = [];

    // Search nodes
    const nodeMatches = this.graphData.nodes.filter(node => {
      const label = (node.label || node.id).toLowerCase();
      return label.includes(q);
    });

    // Search knowledge base
    const kbMatches = Object.entries(this.knowledgeBase)
      .filter(([region, data]) => {
        const label = region.toLowerCase();
        const inTitle = label.includes(q);
        const inKeywords = data.keywords.some(kw => kw.includes(q));
        const inIssues = data.issues.some(issue => 
          issue.title.toLowerCase().includes(q) ||
          issue.symptoms.toLowerCase().includes(q)
        );
        return inTitle || inKeywords || inIssues;
      })
      .map(([region]) => this.graphData.nodes.find(n => n.label === region || n.id === region))
      .filter(n => n);

    // Combine and deduplicate
    const matches = [...new Set([...nodeMatches, ...kbMatches])];
    this.searchMatches = matches;

    // Highlight matches
    this.graph.nodeColor(node =>
      matches.includes(node)
        ? '#f59e0b' // Amber highlight
        : '#38bdf8' // Normal blue
    );

    return matches;
  }

  /**
   * Clear search highlighting
   */
  clearSearch() {
    this.searchMatches = [];
    this.selectedMatch = null;
    this.graph.nodeColor(node => '#38bdf8');
  }

  /**
   * Get troubleshooting guides for a node
   */
  getGuides(nodeId) {
    const node = this.graphData.nodes.find(n => n.id === nodeId);
    if (!node) return null;

    const label = node.label || node.id;
    return this.knowledgeBase[label] || null;
  }

  /**
   * Get all issues in knowledge base
   */
  getAllIssues() {
    const issues = [];
    Object.entries(this.knowledgeBase).forEach(([region, data]) => {
      data.issues.forEach(issue => {
        issues.push({
          region,
          ...issue
        });
      });
    });
    return issues;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BrainSearch;
}
